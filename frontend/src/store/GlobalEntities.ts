import { action, computed, makeObservable, observable } from "mobx";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import { Task } from "@mui/icons-material";

class Entities {
    public _tasks: Task[] = [];
    public doneTasks: Task[] = [];
    public categories: Category[] = [];
    public userToken: string = "";
    public user: User = {
        id: undefined,
        name: undefined,
        email: undefined,
        role: undefined,
        created_at: undefined,
        updated_at: undefined
    };

    constructor() {
        makeObservable(this, {
            _tasks: observable,
            doneTasks: observable,
            user: observable,
            categories: observable,
            loadTasks: action,
            tasks: computed
        });        
    }

    get tasks() {
        return this._tasks;
    }

    @action loadTasks = async () => {
        const resp = await GlobalApiHandlerInstance.get(`/users/${this.user.id}`)
        this.Tasks(resp.data.data.tasks);
    }

    @action login = async (email: string, password: string) => {
        const loginResponse = await GlobalApiHandlerInstance.post(`/login`, {email, password});
        
        localStorage.setItem("userToken", loginResponse.data.data.token);
        
        const userDataResponse = await GlobalApiHandlerInstance.get('/user', {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        this.user = userDataResponse.data;
        await GlobalEntities.loadTasks();
        await GlobalEntities.loadDoneTasks();
    }

    @action loadCategories = async () => {
        const resp = await GlobalApiHandlerInstance.get('/categories');

        this.categories = resp.data.data;
    }

    @action createTask = async (data: Object) => {
        const resp = await GlobalApiHandlerInstance.post('/tasks', data);

        return resp;
    }

    @action updateTask = async (data: Task) => {
        const resp = await GlobalApiHandlerInstance.put(`/tasks/${data.id}`, data);

        if(resp.status === 200) {
            await this.loadTasks();
            await this.loadDoneTasks();
        }
        return resp;
    }

    @action Tasks = (tasks: Task[]) => {
        this._tasks = tasks
    }

    @action loadDoneTasks = async () => {
        const resp = await GlobalApiHandlerInstance.get(`/tasks/today/${this.user.id}`);

        this.setDoneTasks(resp.data.data);
    }

    @action setDoneTasks = (tasks: Task[]) => {
        this.doneTasks = tasks;
    }

}

const GlobalEntities = new Entities();

if (localStorage.getItem("userToken")) {
    const userDataResponse = await GlobalApiHandlerInstance.get('/user', {
        headers:{
           Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })

    GlobalEntities.user = userDataResponse.data;
    await GlobalEntities.loadTasks();
    await GlobalEntities.loadDoneTasks();
}

await GlobalEntities.loadCategories();

export default GlobalEntities