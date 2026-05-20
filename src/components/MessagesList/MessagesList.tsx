import { useShallow } from 'zustand/react/shallow';
import styles from './MessagesList.module.css';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useInboxStore } from '../../store/inboxStore';
import InboxMessage from '../InboxMessage/InboxMessage';


function MessagesList() {
  const [searchParams] = useSearchParams();
  // const { pagesCount, setPagesCount } = usePagesCount();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = useInboxStore(store => store.limit);
  const inboxMessages = useInboxStore(useShallow(state => Object.values(state.messagesMap)));
  const fetchMessages = useInboxStore(state => state.fetchMessages);
  
  useEffect(() => {
    fetchMessages(currentPage, limit, searchParams.getAll('label'));
    // setPagesCount(messagesCount);
  }, [currentPage, searchParams]);
  return (
    <div className={styles['container']}>
      {inboxMessages.map(i => <InboxMessage id={i.id} key={i.id}></InboxMessage>)}
    </div>
  );
}

export default MessagesList;