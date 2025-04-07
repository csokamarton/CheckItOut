import { Box, Button, Card, Container } from "@chakra-ui/react"
import { Stack } from "@mui/material";
import { NavigateFunction } from "react-router-dom"
import ViewComponent from "../interfaces/ViewComponent";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { getElementRef } from "@chakra-ui/react/dist/types/utils";
import { BaseCard } from "../components/Card";
import { ReactNode } from "react";
import { observer } from "mobx-react-lite";



export default class Home implements ViewComponent {
    
    constructor(public navigate: NavigateFunction) {
        
        makeObservable(this, {
            //card: observable,
            showCard: action,
            card: computed
        });
    }

    @action showCard = () => {
        //this.card = GlobalEntities.firstTask === undefined ? null : new BaseCard(toJS(GlobalEntities.firstTask));
        //console.log(this.card);
        return GlobalEntities.firstTask  != undefined;
    }

    @action createCard = (task: Task) => {
        const card = new BaseCard(task);
        return (<card.View />);
    }

    @computed get card() {
        if(GlobalEntities.firstTask  != undefined) {
            return new BaseCard(GlobalEntities.firstTask).View();
        } return <></>
    }

    View = observer(() => (
        <Container>
            <Stack>
                <Box padding={{ md: "5rem", base: "2rem" }}>
                    <h1>
                        Következő teendő
                    </h1>
                    
                    {
                        GlobalEntities.firstTask != undefined 
                        ?
                        this.createCard(GlobalEntities.firstTask)
                        :
                        <h3>Nincs megjeleníthető feladat</h3> 
                    }

                </Box>
                <Box padding={{ md: "5rem", base: "2rem" }}>
                    <h1>
                        Mai teendő
                    </h1>

                    {toJS(GlobalEntities.tasks).map((task: Task, index) => {
                        const card = new BaseCard(toJS(GlobalEntities.tasks[index]));

                        return (
                            < card.View key={index} />
                        )
                    })}


                </Box>
                <Box padding={{ md: "5rem", base: "2rem" }}>
                    <h1>
                        Ma elvégzett teendők
                    </h1>
                    {
                        GlobalEntities.doneTasks.length != 0 ?
                            toJS(GlobalEntities.doneTasks).map((task: Task, index) => {
                                const card = new BaseCard(task);

                                return (
                                    <card.View key={index} />
                                )
                            })
                            :
                            (
                                <h3>Ma még nincs kész feladatot</h3>
                            )
                    }
                </Box>
            </Stack>
            <Button
                onClick={() => this.navigate("/newTask")}
                variant="plain"
                css={{ "float": "right", "marginRight": "0.5rem", 'marginBottom': "0.5rem", "backgroundColor": "#007bff", "color": "white" }} >
                +
            </Button>
        </Container>

    ))
}