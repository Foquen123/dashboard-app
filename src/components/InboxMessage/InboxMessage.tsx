import { useState } from 'react';
import useCssVariable from '../../hooks/useCssVariables';
import Checkbox from '../Checkbox/Checkbox';
import Label from '../Label/Label';
import styles from './InboxMessage.module.css';
import type { InboxMessageProps } from './InboxMessage.props';
import { useInboxStore } from '../../store/inboxStore';

function InboxMessage({ id }: InboxMessageProps) {
  const inboxMessage = useInboxStore(store => store.messagesMap[id]);
  const changeStarredStatus = useInboxStore(store => store.changeStarredStatus);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  // const [isStarred, setIsStarred] = useState<boolean>(inboxMessage.isStarred);
  const textSecondaryColor = useCssVariable('--text-secondary');
  if (!inboxMessage) return null;

  const handleSecondCheckboxClick = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    e.stopPropagation(); // Останавливаем всплытие события
    changeStarredStatus(id);
  };

  return (
    <div className={styles['container-wrapper']} >
      <div className={styles['container']} data-is-select={isSelect} onClick={() => setIsSelect(!isSelect)}>
        <div className={styles['left']}>
          <div className={styles['checkboxes']}>
            <Checkbox checked={isSelect} onChange={(e) => setIsSelect(e.target.checked)} backgroundColor={textSecondaryColor} borderColor={textSecondaryColor}></Checkbox>
            <Checkbox onClick={e => e.stopPropagation()} checked={inboxMessage.isStarred} onChange={handleSecondCheckboxClick} backgroundColor={'#ffd56d'} borderColor={textSecondaryColor} shape='star'></Checkbox>
          </div>
          <div className={styles['name']}>{inboxMessage.name}</div>
        </div>
        <div className={styles['center']}>
          <Label color={inboxMessage.label.color} width={60}>{inboxMessage.label.text}</Label>
          <div className={styles['message']}>{inboxMessage.message}</div>
        </div>
        <div className={styles['time']}>{inboxMessage.time}</div>
      </div>
    </div>
  );
}

export default InboxMessage;
