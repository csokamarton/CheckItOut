import { Box, Button, Card, Container, Stack } from "@chakra-ui/react"
import { NavigateFunction } from "react-router-dom"
import ViewComponent from "../interfaces/ViewComponent";
import { makeObservable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { getElementRef } from "@chakra-ui/react/dist/types/utils";



export default class Home implements ViewComponent {
    constructor(public navigate: NavigateFunction) {
        makeObservable(this, {});
    }

    View = () => (
        <Container>
            <Stack>
                <Box>
                    <h1>
                        Következő teendő
                    </h1>
                    <Card.Root css={{ "boxShadow": "7px 7px 7px rgb(0,0,0,0.5)", "borderRadius": "0.5rem", "margin": "5rem" }}>
                        <Card.Body>
                            <Card.Description>
                               {toJS(GlobalEntities.tasks)[0].description}
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>
                </Box>
                <Box>
                    <h1>
                        Mai teendő
                    </h1>
                    {toJS(GlobalEntities.tasks).map((task: Task, index) => (
                        <Card.Root key={index} css={{ "boxShadow": "7px 7px 7px rgb(0,0,0,0.5)", "borderRadius": "0.5rem", "marginTop": "0.2rem", "marginLeft": "5rem", "marginRight": "5rem" }}>
                            <Card.Body>
                                <Card.Description>
                                    {task.description}
                                </Card.Description>
                            </Card.Body>
                        </Card.Root>
                    ))}



                </Box>
                <Box>
                    <h1>
                        Ma elvégzett teendők
                    </h1>
                    <Card.Root css={{ "boxShadow": "7px 7px 7px rgb(0,0,0,0.5)", "borderRadius": "0.5rem", "margin": "5rem" }}>
                        <Card.Body>
                            <Card.Description>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sunt nostrum eos recusandae fugit quod est nemo explicabo quos obcaecati maiores, cumque neque nihil optio suscipit vero sed molestias iure!
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Stack>
            <Button
                onClick={() => this.navigate("/newTask")}
                variant="plain"
                css={{ "float": "right", "marginRight": "0.5rem", 'marginBottom': "0.5rem", "backgroundColor": "#007bff", "color": "white" }} >
                +
            </Button>
        </Container>

    )
}