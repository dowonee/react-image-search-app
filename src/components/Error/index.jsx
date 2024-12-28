import './styles.css';

export default function ErrorInfo(error) {
  return (
    <>
      <p className='error-message'>{error.message}</p>
    </>
  )
}
