import { useQuery } from "react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface IToDos {
    todo: string,
    completed: boolean,
    id: number
}

const ToDos = () => {
    const { isLoading, isError, isFetching, data, error } = useQuery<IToDos[], Error>("todos", async () => {
        return new Promise<IToDos[]>(async (resolve) => {
            await setTimeout(() => {
                resolve([
                    { todo: 'todo1', completed: false, id: 1 },
                    { todo: 'todo2', completed: false, id: 2 },
                    { todo: 'todo3', completed: true, id: 3 },
                ])
            }, 500)
        })
    });

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result

        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) { return }

        if (source.droppableId === 'todoL' && destination.droppableId === 'todoR') {
            console.log('from L to R add todo')
        }

        if (source.droppableId === 'todoR' && destination.droppableId === 'todoL') {
            console.log('from R to L add todo')
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='w-full col-start-2 col-span-2 grid grid-cols-6 gap-5 font-["Kumbh_Sans"] text-lg'>
                {
                    isLoading ?
                        <span className='text-info'>Loading...</span>
                        :
                        isError ?
                            <span className='text-error'>Error: {error.message}</span>
                            :
                            isFetching ?
                                <span className='text-info'>Refreshing...</span>
                                :
                                <>
                                    <Droppable droppableId="todoL">
                                        {
                                            (provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps} className='col-span-3 bg-neutral w-full rounded-md p-4 shadow-black shadow-sm'>
                                                    <h1 className="text-lg text-primary text-center">Tasks to do</h1>
                                                    <div className="flex flex-col gap-2">
                                                        {data?.filter(({ completed }) => !completed).map(({ todo, id }, index) =>
                                                            <Draggable draggableId={id.toString()} index={index} key={index}>
                                                                {
                                                                    (provided) => (
                                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-neutral w-full rounded-md p-4 border-2 border-info'>
                                                                            <p className='text-info'>
                                                                                {todo}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </Draggable>
                                                        )}
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    </Droppable>
                                    <Droppable droppableId="todoR">
                                        {
                                            (provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps} className='col-start-4 col-span-3 bg-neutral w-full rounded-md p-4 shadow-black shadow-sm'>
                                                    <h1 className="text-lg text-primary text-center">Completed tasks</h1>
                                                    <div className="flex flex-col gap-2">
                                                        {data?.filter(({ completed }) => completed).map(({ todo, id }, index) =>
                                                            <Draggable draggableId={id.toString()} index={index} key={index}>
                                                                {
                                                                    (provided) => (
                                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-neutral w-full rounded-md p-4 border-2 border-secondary'>
                                                                            <p className='text-secondary'>
                                                                                {todo}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </Draggable>
                                                        )}
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    </Droppable>
                                </>
                }
            </div>
        </DragDropContext>
    )
}

export default ToDos