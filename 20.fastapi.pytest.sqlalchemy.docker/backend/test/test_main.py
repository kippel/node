
def test_ping(test_app):
    response = test_app.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"ping": "pong!"}

def test_root(test_app):
    response = test_app.get("/")
    assert response.status_code == 200
    #assert response.json() == {"user": {'id': '02a0f0df-caa6-48fd-b9e2-f446f224a72c', 'password': 'qwerty', 'username': 'kippel'}}
    res = response.json()

    for i in res['user']:
        assert i['username'] == "kippel"
        assert i['password'] == "qwerty"
