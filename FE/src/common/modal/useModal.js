import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const openModal = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const selectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    openModal();
  }
  return { isOpen, openModal, onClose, selectSchedule, selectedSchedule };
};

export default useModal;
