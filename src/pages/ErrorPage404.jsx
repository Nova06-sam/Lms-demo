import { Link } from 'react-router-dom';

const ErrorPage404 = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 flex-col gap-4'>
      <h1 className='text-4xl font-bold text-blue-600'>404 - Page Not Found</h1>
      <p className='text-lg font-semibold text-gray-800 mb-4'>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        focus:outline-none focus:shadow-outline'>Go to Homepage</Link>
    </div>
  )
}

export default ErrorPage404

