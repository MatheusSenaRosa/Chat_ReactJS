import { Chat, Chats, Login, RestoringSession } from "@pages";
import { MainContextProvider, useMainContext } from "@contexts";

function AppElement() {
  const { isRestoringSession, session, openedChat } = useMainContext();

  return (
    <div className="h-screen w-screen flex flex-col bg-[#2e2e2e] items-center justify-center">
      <main className="bg-[#0a0a0a] h-full flex flex-col w-full max-w-[450px] rounded-3xl overflow-hidden sm:h-[700px]">
        {Boolean(!session && !isRestoringSession) && <Login />}

        {isRestoringSession && <RestoringSession />}

        {Boolean(session && !openedChat) && <Chats />}

        {Boolean(session && openedChat) && <Chat />}
      </main>
    </div>
  );
}
function App() {
  return (
    <MainContextProvider>
      <AppElement />
    </MainContextProvider>
  );
}

export default App;
