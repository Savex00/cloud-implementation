const baseUrl = "http://127.0.0.1:5000";

export default class APIServices {
  static UpdateArticle(id, body) {
    return fetch(`${baseUrl}/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertArticle(body) {
    return fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteArticle(id) {
    return fetch(`${baseUrl}/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getAll() {
    return fetch(`${baseUrl}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
