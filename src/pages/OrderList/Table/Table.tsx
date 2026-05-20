import React, { useEffect } from 'react';
import Label from '../../../components/Label/Label';
import styles from './Table.module.css';
import { useSearchParams } from 'react-router';
import { useOrderStore } from '../../../store/orderStore';
import { useShallow } from 'zustand/react/shallow';
import useDatesFromUrl from '../../../hooks/useDatesFromUrl';
import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n';

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  // Используем опции с локалью 'en-US', чтобы получить 'Sep'
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }); // 'Sep'
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function Table() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = useOrderStore(store => store.limit);
  const { t } = useTranslation();
  const orders = useOrderStore(useShallow(state => Object.values(state.ordersMap)));
  const fetchOrders = useOrderStore(state => state.fetchOrders);

  const dates = useDatesFromUrl();

  useEffect(() => {
    if (dates.length === 1) {
      fetchOrders(currentPage);

    }
    else {

      fetchOrders(currentPage, limit);
    }
  }, [currentPage, searchParams]);
  return (
    <div className={styles['table']}>
      <div className={`${styles['header']} ${styles['first-col']}`}>id</div>
      <div className={`${styles['header']}`}>{t('orderList.name')}</div>
      <div className={`${styles['header']}`}>{t('orderList.address')}</div>
      <div className={`${styles['header']}`}>{t('orderList.date')}</div>
      <div className={`${styles['header']}`}>{t('orderList.type')}</div>
      <div className={`${styles['header']}`}>{t('orderList.status')}</div>

      {orders.map(o => <React.Fragment key={o.id}>
        <div className={`${styles['body']} ${styles['first-col']}`}>{o.id}</div>
        <div className={`${styles['body']}`}>{o.name}</div>
        <div className={`${styles['body']}`}>{o.address}</div>
        <div className={`${styles['body']}`}>{formatDate(o.date)}</div>
        <div className={`${styles['body']}`}>{o.type.name}</div>
        <div className={`${styles['body']}`}><Label color={o.status.color} width={93}>{o.status.text}</Label></div>
      </React.Fragment>)}


    </div>
  );
}

export default Table;