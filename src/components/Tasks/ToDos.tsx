import { useQuery, useMutation } from "react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { getTodos, updateToDo } from '../../api/helper'
import { IToDos } from '../../interfaces/interfaces'


const ToDos = () => {
    const { isLoading, isError, isFetching, data, error } = useQuery<IToDos, Error>("todos", getTodos);

    const mutation = useMutation(updateToDo)

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) { return }

        if (!data) { return }

        let [tmp] = data.filter(({ id }) => id == parseInt(draggableId))

        if ((source.droppableId === 'todoL' && destination.droppableId === 'todoR') ||
            (source.droppableId === 'todoR' && destination.droppableId === 'todoL')) {
            tmp.completed = !tmp.completed
            await mutation.mutate(tmp)
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
                                                        {!mutation.isLoading ?
                                                            data?.filter(({ completed }) => !completed).map(({ todo, id }, index) =>
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
                                                            )
                                                            :
                                                            data?.filter(({ completed }) => !completed).map(({ todo }, index) =>
                                                                <div key={index} className='bg-neutral w-full rounded-md p-4 border-2 border-info'>
                                                                    <p className='text-info'>
                                                                        {todo}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
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
                                                        {!mutation.isLoading ?
                                                            data?.filter(({ completed }) => completed).map(({ todo, id }, index) =>
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
                                                            )
                                                            :
                                                            data?.filter(({ completed }) => !completed).map(({ todo }, index) =>
                                                                <div key={index} className='bg-neutral w-full rounded-md p-4 border-2 border-info'>
                                                                    <p className='text-info'>
                                                                        {todo}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
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