import SignupForm from '@/features/auth/components/SignupForm'

const SignupPage = () => {
  return (
    <div className='mx-auto max-w-2xl py-24'>
      <h2 className='font-semibold'>Criação de Usuário</h2>
      <p className='mt-1 text-gray-600'>Crie seu usuário para acessar o sistema.</p>
      <div className='grid grid-cols-1 mt-10 space-y-10'>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;