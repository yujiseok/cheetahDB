import Row from "../../components/Row";
import requests from "../../api/requests";

const Home = () => {
  return (
    <section>
      <Row
        title="🎬박스오피스 순위"
        id="popular"
        fetchUrl={requests.fetchPopular}
      />
      <Row
        title="🐆치타디비 실시간 급상승"
        id="trending"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="👀개봉 예정작"
        id="upcoming"
        fetchUrl={requests.fetchUpcoming}
      />
      <Row
        title="🥇평균 별점이 높은 작품"
        id="top rated"
        fetchUrl={requests.fetchTopRated}
      />
    </section>
  );
};
export default Home;
