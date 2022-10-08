import React, { Component } from 'react'
import axios from 'axios'
let numid = 0;

export default class CreateUser extends Component {

    state = {
        user: '',
        users: []
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/users');
        this.setState({
            users: res.data
        });
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/users', {
            username: this.state.username
        });
        this.setState({ username: '' });
        this.getUsers();
    }

    deleteUser = async (userId) => {
        await axios.delete('http://localhost:5000/api/users/' + userId);
        this.getUsers();
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.username}
                                    type="text"
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                    </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            
                            this.state.users.map(user => ( 
                                <>
                                <li className="list-group-item list-group-item-action" key={user._id} data-toggle="modal" data-target="#exampleModal" onClick={() => numid = user._id}>
                                    {user.username}
                                </li>
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">¿Borrar Nota?</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                    La nota no se podrá recuperar.
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => this.deleteUser(numid)}>Borrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ))
                        }
                    </ul>
                    
                </div>
            </div>
        )
    }
}
