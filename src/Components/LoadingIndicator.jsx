import CircularProgress from '@mui/material/CircularProgress';
export default function LoadingIndicator() {
  return (
    <section className="flex flex-col  min-h-screen items-center " role="status" aria-label="Loading content" >
      <p className="text-xl font-bold  mb-2">Loading...</p>
      <CircularProgress color="disabled" fontSize="small" />
    </section>
  );
}


