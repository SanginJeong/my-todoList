import {create} from 'zustand';

export const useModalStore = create((set)=>{
  return (
    {
      isOpenAddModal : false,
      isOpenUpdateModal : false,
      closeAddModal : () => set(()=>({isOpenAddModal: false})),
      closeUpdateModal : () => set(()=>({isOpenUpdateModal: false})),
      openAddModal : () => set(()=>({isOpenAddModal: true})),
      openUpdateModal : () => set(()=>({isOpenUpdateModal: true})),
      onClickContent : (e) => e.stopPropagation(),
      selectedSchedule : null,
      onSelectSchedule : (schedule) => set(()=>({
        selectedSchedule: schedule,
        isOpenUpdateModal : true,
      }))
    }
  )
})