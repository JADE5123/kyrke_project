// ✅ Firebase 초기화
firebase.initializeApp({
    apiKey: "AIzaSyD1_oX0cqZVZh7FOoBGcD-9wAJnHieH4z4",
    authDomain: "kyrke-edit.firebaseapp.com",
    projectId: "kyrke-edit",
    storageBucket: "kyrke-edit.appspot.com",
    messagingSenderId: "565953256471",
    appId: "1:565953256471:web:dd2501f729be7c06ef1052"
});

// ✅ Firebase 인증 & Firestore 연결
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ 로그인 함수
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("로그인 성공:", userCredential.user);
            alert("로그인 성공!");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("로그인 오류:", error.message);
            alert("로그인 실패: " + error.message);
        });
}

// ✅ 로그아웃 함수
function logout() {
    auth.signOut().then(() => {
        alert("로그아웃 되었습니다.");
        window.location.href = "index.html";
    });
}

// ✅ 회원가입 함수
function signUp() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const name = document.getElementById("signup-name").value;
    const phone = document.getElementById("signup-phone").value;
    const address = document.getElementById("signup-address").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                phone: phone,
                address: address,
                role: "customer"
            });
        })
        .then(() => {
            alert("회원가입 성공!");
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("회원가입 오류:", error.message);
            alert("회원가입 실패: " + error.message);
        });
}

// ✅ 로그인 상태에 따라 UI 업데이트
auth.onAuthStateChanged(user => {
    const isLoggedIn = !!user;
    console.log("로그인 상태:", isLoggedIn);

    document.getElementById("login-link")?.classList.toggle("hidden", isLoggedIn);
    document.getElementById("signup-link")?.classList.toggle("hidden", isLoggedIn);
    document.getElementById("mypage-link")?.classList.toggle("hidden", !isLoggedIn);
    document.getElementById("logout-link")?.classList.toggle("hidden", !isLoggedIn);
});
