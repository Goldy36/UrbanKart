import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import RecommendationsSection from "../components/RecommendationsSection";
import RecentlyViewedSection from "../components/RecentlyViewedSection";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <RecommendationsSection />
      <RecentlyViewedSection />
      <ProductList showFilters={false} limit={8} />
    </>
  );
};

export default HomePage;
