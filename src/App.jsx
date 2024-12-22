import Header from "./components/Header/Header";
import ImageSlider from "./components/Slider/ImageSlider";
import InfoCard from "./components/InfoCard/InfoCard";
import Footer from "./components/Footer/Footer";

import images from "./data/images";
import cards from "./data/cards";

function App() {
  return (
    <>
      <Header />
      <ImageSlider images={images} />
      <InfoCard cards={cards} />
      <Footer />
    </>
  );
}

export default App;
