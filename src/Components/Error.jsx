import Alert from '@mui/material/Alert';
export default function Error({ title, message }) {
  return (
    <section
      className="flex flex-col justify-center items-center" role="alert" aria-label="Error message">
      <h1 className="font-bold text-red-600">{title}</h1>
      <Alert severity="error">{message}</Alert>
    </section>
  );
}
