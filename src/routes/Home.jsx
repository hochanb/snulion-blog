// 추가 👇🏻 : useEffect import해주기
import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";

const Home = () => {
  const [postList, setPostList] = useState(posts);

  // 추가 👇🏻
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const tagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        acc.add(tag.content);
      }
      return acc;
    }, new Set());
    setTags([...tagList]);
    setSearchTags([...tagList]);
  }, []);
  // 추가 🖕🏻

  const handleChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };
  
  const handleTagFilter = (e) => {
    const { innerText } = e.target;
    let tag=innerText.slice(1);
    console.log(e.target.getAttribute("tag"));
    if(tag == searchValue) {
      setSearchValue("");
      setSearchTags(tags);
      setPostList(posts);
    }
    else {
      setSearchValue(tag);
      const newTags = tags.filter((postTag) => postTag.includes(tag));
      setSearchTags(newTags);
    
    let filteredPosts = posts.filter((post) => {
      for (let postTag of post.tags) {
        if (postTag.content === tag) {
          return true;
        }
      }
      return false;

    });
    setPostList(filteredPosts);
  }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="pb-5 flex items-end justify-center bg-[url('https://www.codelion.net/codelion_thumb.jpg')] w-full h-72 bg-center bg-cover">
          <h1 className="uppercase text-6xl text-white">my blog</h1>
        </div>
        <input
          type="text"
          placeholder="Tag Search"
          onChange={handleChange}
          className="border border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400 bg-transparent"
        />
        <div className="flex mt-5">
          {searchTags.map((tag) => {
            return (
              <button
                key={tag}
                tag={tag}
                className={tag === searchValue ? "tag active mr-2" : "tag mr-2"}
                onClick={handleTagFilter}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-4 px-10 mt-10">
        {postList.map((post) => (
          <SmallPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
