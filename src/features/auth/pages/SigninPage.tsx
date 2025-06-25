import SigninForm from "@/features/auth/components/SigninForm";

const SigninPage = () => {

  return (
    <div className='mx-auto max-w-2xl py-24'>
      <h2 className='font-semibold'>Login de Usuário</h2>
      <p className='mt-1 text-gray-600'>Logue com o seu usuário para acessar o sistema.</p>
      <div className='grid grid-cols-1 mt-10 space-y-10'>
        <SigninForm />
      </div>
    </div>
  );
};

export default SigninPage;
