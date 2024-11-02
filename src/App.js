import React from "react";
import MainLayout from "./layout/MainLayout";
import Headline from "./components/atoms/Headline";

function App() {
  return (
      <MainLayout>
        <Headline text="Homepage" level={1} align="center" />
      </MainLayout>
  );
}

export default App;
