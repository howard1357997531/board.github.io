export default class APIService {
  static LoginUser(body) {
    return fetch(`/api/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static RegisterUser(body) {
    return fetch(`/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => console.log(res));
  }
  static GetArticleList(token) {
    if (token) {
      return fetch("/api/articleList/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => res.json());
    } else {
      return fetch("/api/articleList/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }
  }

  static GETProfile(user_id) {
    return fetch(`/api/profile/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  static UpdateProfile(user_id, body, token) {
    return fetch(`/api/profile/${user_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static CreateLike(body, token) {
    return fetch("/api/like/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static DeleteLike(body, token, user_likeId_for_thisArticle) {
    return fetch(`/api/like/${user_likeId_for_thisArticle}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  static CreateArticle(body, token) {
    return fetch(`/api/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static EditArticle(article_id, body, token) {
    return fetch(`/api/articles/${article_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static DeleteeArticle(article_id, token) {
    return fetch(`/api/articles/${article_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }
}
