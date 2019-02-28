import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },
  getUser (){
    return Api().get('users');
  }
}