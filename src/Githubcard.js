import React , {Component} from 'react'


class GithubCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: null ,
            loading : false ,
            error : null
        };
    }

    componentDidMount(){
        this.setState({loading : true , error : null });

        fetch(`https://api.github.com/users/${this.props.username}`)
        .then((response ) => response.json())
        .then((data) =>{
            if(data.message){
                this.setState({error: data.message , loading : false })
            }
            else{
                this.setState({user:data , loading:false})
            }
        })
        .catch((error)=>{
            this.setState({error : 'Link not workong' , loading:false})

        })
    }
    render(){
        const {user , loading, error } = this.state

        if(loading){
            return <h5>Loading...</h5>
        }
        if(error){
            return <div> Error : {error}</div>
        }
        if(!user){
            return <h5>User not found </h5>
        }
        return(
            <div className='github-card'>
                <img src={user.avatar_url}  alt={user.login} />
                <h2>{user.login}</h2>
                <p>{user.bio}</p>
                <a href={user.html_url}  >Github profile</a>

            </div>
        )
    }

}

export default GithubCard;