import ImagesSlider from "../components/ImageSlider";
import Location from "../components/Location";
import CategoryImageContainer from "../components/CategoryImageContainer";
import SearchBar from "../components/SearchBar";
import DrugContainer from "../components/DrugContainer";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div>
      <Location />
      <SearchBar placeholder="search drugs..." />
      <ImagesSlider />
      <CategoryImageContainer />
      <DrugContainer />

      <Footer type="home" />
    </div>
  );
}
