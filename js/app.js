// ===============================
// 电影数据
// ===============================

const movies = [

    {
        id: 1,
        title: "星际穿越",
        score: 9.4,
        year: 2014,
        category: ["科幻", "剧情"],
        director: "Christopher Nolan",
        duration: "169分钟",
        poster: "images/interstellar.jpg",
        description:
            "在未来的地球，人类面临严重的生存危机。一群宇航员穿越虫洞，寻找适合人类居住的新家园。"
    },

    {
        id: 2,
        title: "盗梦空间",
        score: 9.3,
        year: 2010,
        category: ["科幻", "动作"],
        director: "Christopher Nolan",
        duration: "148分钟",
        poster: "images/inception.jpg",
        description:
            "一群专业人士可以进入他人的梦境，并通过梦境完成各种任务。梦境与现实之间的界限逐渐变得模糊。"
    },

    {
        id: 3,
        title: "肖申克的救赎",
        score: 9.7,
        year: 1994,
        category: ["剧情"],
        director: "Frank Darabont",
        duration: "142分钟",
        poster: "images/shawshank.jpg",
        description:
            "一名银行家被错误关进监狱，在漫长的岁月中寻找自由与希望，并用自己的方式改变了身边的人。"
    },

    {
        id: 4,
        title: "这个杀手不太冷",
        score: 9.4,
        year: 1994,
        category: ["剧情", "动作"],
        director: "Luc Besson",
        duration: "133分钟",
        poster: "images/leon.jpg",
        description:
            "一名职业杀手与一个小女孩之间产生了特殊的情感，两人的命运因此发生改变。"
    },

    {
        id: 5,
        title: "阿甘正传",
        score: 9.5,
        year: 1994,
        category: ["剧情","喜剧"],
        director: "Robert Zemeckis",
        duration: "142分钟",
        poster: "images/forrest.jpg",
        description:
            "一个看似普通的人，用自己的方式经历了美国社会几十年的变化，也经历了一段段令人难忘的人生故事。"
    }

];


// ===============================
// 获取 HTML 元素
// ===============================

const movieGrid = document.getElementById("movieGrid");

const rankingList = document.getElementById("rankingList");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const movieModal = document.getElementById("movieModal");

const movieDetail = document.getElementById("movieDetail");


// ===============================
// 显示电影
// ===============================

function renderMovies(movieList) {

    movieGrid.innerHTML = "";

    if (movieList.length === 0) {

        movieGrid.innerHTML = `
            <p style="color:#999;">
                没有找到相关电影。
            </p>
        `;

        return;
    }


    movieList.forEach(function(movie) {

        const card = document.createElement("div");

        card.className = "movie-card";


        card.innerHTML = `

            <div class="movie-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                >

            </div>


            <div class="movie-info">

                <h3 class="movie-title">
                    ${movie.title}
                </h3>


                <div class="movie-meta">

                    <span>
                        ${movie.year}
                    </span>


                    <span class="movie-score">
                        ⭐ ${movie.score}
                    </span>

                </div>

            </div>

        `;


        // 点击电影卡片
        card.addEventListener("click", function() {

            showMovieDetail(movie.id);

        });


        movieGrid.appendChild(card);

    });

}


// ===============================
// 显示排行榜
// ===============================

function renderRanking() {

    const sortedMovies = [...movies].sort(function(a, b) {

        return b.score - a.score;

    });


    rankingList.innerHTML = "";


    sortedMovies.forEach(function(movie, index) {

        const item = document.createElement("div");

        item.className = "ranking-item";


        item.innerHTML = `

            <div class="ranking-number">
            ${index + 1}
            </div>

            <div class="ranking-name">
            ${movie.title}
            </div>

            <div class="ranking-score">
            ⭐ ${movie.score}
            </div>

            <div class="ranking-arrow">
            →
            </div>

            `;
        item.addEventListener("click", function() {

    showMovieDetail(movie.id);

    });


        rankingList.appendChild(item);

    });

}


// ===============================
// 分类筛选
// ===============================

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const category =
            button.dataset.category;


        // 修改按钮状态

        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        // 点击“全部”

        if (category === "全部") {

            renderMovies(movies);

            return;

        }


        // 筛选电影

        const filteredMovies =
            movies.filter(function(movie) {

                return movie.category.includes(category);

            });


        renderMovies(filteredMovies);

    });

});


// ===============================
// 搜索电影
// ===============================

function searchMovies() {

    const keyword =
        searchInput.value.trim().toLowerCase();


    // 搜索框为空

    if (keyword === "") {

        renderMovies(movies);

        return;

    }


    // 根据电影名称搜索

    const result =
        movies.filter(function(movie) {

            return movie.title
                .toLowerCase()
                .includes(keyword);

        });


    renderMovies(result);

}


// 点击搜索按钮

searchBtn.addEventListener(
    "click",
    searchMovies
);


// 按 Enter 搜索

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchMovies();

        }

    }
);


// ===============================
// 显示电影详情
// ===============================

function showMovieDetail(movieId) {

    // 根据 id 找电影

    const movie =
        movies.find(function(movie) {

            return movie.id === movieId;

        });


    // 如果没有找到电影

    if (!movie) {

        return;

    }


    // 创建详情页面

    movieDetail.innerHTML = `

        <div class="detail-container">


            <div class="detail-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                >

            </div>


            <div class="detail-info">


                <h2>
                    ${movie.title}
                </h2>


                <p>
                    ⭐ ${movie.score}
                </p>


                <p>
                    上映年份：${movie.year}
                </p>


                <p>
                    导演：${movie.director}
                </p>


                <p>
                    时长：${movie.duration}
                </p>


                <p>
                    类型：
                    ${movie.category.join(" / ")}
                </p>


                <p>
                    剧情简介：
                    ${movie.description}
                </p>


               <button
                   class="favorite-btn"
                    id="favoriteBtn"
                   onclick="toggleFavorite(${movie.id})"
               >
               收藏
              </button>


            </div>

        </div>

    `;


    // 显示弹窗

    movieModal.classList.add("show");
    updateFavoriteButton(movie.id);

}


// ===============================
// 关闭详情
// ===============================

function closeMovieDetail() {

    movieModal.classList.remove("show");

}


// 点击弹窗外部关闭

movieModal.addEventListener(
    "click",
    function(event) {

        if (event.target === movieModal) {

            closeMovieDetail();

        }

    }
);


// ===============================
// 收藏系统
// ===============================


// 判断电影是否已经收藏
function isFavorite(movieId) {

    const favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    return favorites.includes(movieId);
}


// 收藏 / 取消收藏
function toggleFavorite(movieId) {

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];


    // 如果已经收藏
    if (favorites.includes(movieId)) {

        // 删除这部电影
        favorites =
            favorites.filter(function(id) {

                return id !== movieId;

            });

        alert("已取消收藏！");

    }

    // 如果还没有收藏
    else {

        favorites.push(movieId);

        alert("收藏成功！");

    }


    // 保存新的收藏数据
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    // 更新按钮状态
    updateFavoriteButton(movieId);

}


// 更新收藏按钮
function updateFavoriteButton(movieId) {

    const favoriteBtn =
        document.getElementById("favoriteBtn");


    if (!favoriteBtn) {

        return;

    }


    if (isFavorite(movieId)) {

        favoriteBtn.textContent =
            "❤️ 已收藏";

        favoriteBtn.classList.add("favorited");

    }

    else {

        favoriteBtn.textContent =
            "🤍 收藏电影";

        favoriteBtn.classList.remove("favorited");

    }

}


function isFavorite(movieId) {

    const favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    return favorites.includes(movieId);
}


// ===============================
// 初始化网站
// ===============================

renderMovies(movies);

renderRanking();

