import React from "react";
import MainLayout from "./layout/MainLayout";
import Headline from "./components/atoms/Headline";

function App() {
  document.body.style = 'background: #1E1E1E;';
  return (
      <MainLayout>
        <Headline text="Homepage" level={1} align="center" />
      </MainLayout>
  );
}

export default App;
