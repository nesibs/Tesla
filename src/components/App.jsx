import Header from "./Header";
import SliderMain from "./SliderMain";
import Swiper1 from "./Swiper1";
import Cards from "./Cards";
import Swiper2 from "./Swiper2";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const App = () => {
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoding(true);
    }, 3000);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <Header />
          <SliderMain />
          <Swiper1 />
          <Cards />
          <Swiper2 />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
