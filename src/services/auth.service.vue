

<script>

export default {
    name: "AuthService",
    data(){
        return{
            
        }
    },
    props: {

    },
    methods: {

      getToken() {
        return this.authToken;
      },
    
      getUserId() {
        return this.userId;
      },
    
      loginUser(email: string, password) {
        return new Promise((resolve, reject) => {
          this.http.post('http://localhost:3000/api/auth/login', {email: email, password: password}).subscribe(
            (response: {userId: string, token: string}) => {
              this.userId = response.userId;
              this.authToken = response.token;
              this.isAuth$.next(true);
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        });
      },
    
      logout() {
        this.authToken = null;
        this.userId = null;
        this.isAuth$.next(false);
        this.router.navigate(['login']);
      }
    }
    
}
</script>
