import { useQuery, useMutation, useQueryClient } from "react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { getTodos, updateToDo, deleteToDo } from '../../api/helper'
import { IToDos } from '../../interfaces/interfaces'

const ToDos = () => {
    const { isLoading, isError, isFetching, data, error } = useQuery<IToDos, Error>("todos", getTodos);
    const queryClient = useQueryClient()
    const mutation = useMutation(updateToDo)
    const deleteMutation = useMutation(deleteToDo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    })

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

    const handleDelete = async (id: number) => {
        await deleteMutation.mutate(id)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='w-full col-start-2 col-span-2 grid grid-cols-6 gap-5 font-["Kumbh_Sans"] text-lg'>
                {isLoading ?
                    <span className="text-info">Loading...</span>
                    :
                    isError ?
                        <span className='text-error'>Error: {error.message}</span>
                        :
                        <>
                            <Droppable droppableId="todoL">
                                {
                                    (provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps} className='col-span-3 bg-neutral w-full rounded-md p-4 shadow-black shadow-sm'>
                                            <h1 className="text-lg text-primary text-center">Tasks to do</h1>
                                            <div className="flex flex-col gap-2">
                                                {!isFetching ?
                                                    data?.filter(({ completed }) => !completed).map(({ todo, id }, index) =>
                                                        <Draggable draggableId={id.toString()} index={index} key={index}>
                                                            {
                                                                (provided) => (
                                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-neutral w-full rounded-md p-4 border-2 border-info flex justify-between items-center'>
                                                                        <p className='text-info'>
                                                                            {todo}
                                                                        </p>
                                                                        <button onClick={() => handleDelete(id)} className="h-7 min-h-0 w-7 btn btn-square grid items-center text-error hover:text-warning">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    ) :
                                                    data?.filter(({ completed }) => !completed).map(({ todo }, index) =>
                                                        <div key={index} className='bg-neutral w-full rounded-md p-4 border-2 border-info flex justify-between items-center'>
                                                            <p className='text-info'>
                                                                {todo}
                                                            </p>
                                                            <button className="h-7 min-h-0 w-7 btn btn-square grid items-center text-error hover:text-warning">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
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
                                                {!isFetching ?
                                                    data?.filter(({ completed }) => completed).map(({ todo, id }, index) =>
                                                        <Draggable draggableId={id.toString()} index={index} key={index}>
                                                            {
                                                                (provided) => (
                                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-neutral w-full rounded-md p-4 border-2 border-secondary flex justify-between items-center'>
                                                                        <p className='text-secondary'>
                                                                            {todo}
                                                                        </p>
                                                                        <button onClick={() => handleDelete(id)} className="h-7 min-h-0 w-7 btn btn-square grid items-center text-error hover:text-warning">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    )
                                                    :
                                                    data?.filter(({ completed }) => completed).map(({ todo }, index) =>
                                                        <div key={index} className='bg-neutral w-full rounded-md p-4 border-2 border-secondary flex justify-between items-center'>
                                                            <p className='text-secondary'>
                                                                {todo}
                                                            </p>
                                                            <button className="h-7 min-h-0 w-7 btn btn-square grid items-center text-error hover:text-warning">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
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