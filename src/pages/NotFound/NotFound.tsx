import styles from './NotFound.module.css';
import bg from '@/assets/notfound-bg.jpg';
import image404 from '@/assets/404.jpg';

function NotFound() {
  return (
    <div className={styles['page']} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles['details']}>
        <img className={styles['image']} src={image404} alt="" />
        <div className={styles['info']}>
          Looks like you’ve got lost….
          <a className={styles['link']} href={import.meta.env.BASE_URL}>
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
