import React, {useEffect,useState}from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_Alerta } from '../Functions';
const ShowUsers = () => {
    let url='http://localhost:8094/api/usuarios/list';    
    let [usuarios,setUsuarios]=useState([]);
    let [id,setId]=useState('');
    let [numeroDocumento,setNumerodocumento]=useState('');
    let [email,setEmail]=useState('');
    let [nombre,setNombre]=useState('');
    let [password,setPassword]=useState('');
    let [nombreUsuario,setNombreusuario]=useState('');
    let [operation,setOperation]=useState(1);
    let [title,setTitle]=useState('');
    useEffect(()=>{
      getUsers();
    },[]);

    const getUsers=async () =>{
      const respuesta=await axios.get(url);
      setUsuarios(respuesta.data);
    }
    const openModal=(op,id,nombre,nombreUsuario,numeroDocumento,email,password)=>{
      setId('');
      setNombre('');
      setNombreusuario('');
      setNumerodocumento('');
      setEmail('');
      setPassword('');
      setOperation(op);
      if(op==1){
        setTitle('Registrar usuario');
      }
      else if(op==2){
        setTitle('Editar usuario');
        setId(id);
        setNombre(nombre);
        setNombreusuario(nombreUsuario);
        setNumerodocumento(numeroDocumento);
        setEmail(email);
        setPassword(password);
      }
      window.setTimeout(function(){
        document.getElementById('nombre').focus();
      },500)
    }
    const validar =()=>{
      let parametros;
      let metodo;
      if(nombre.trim()==''){
        show_Alerta('Escribe el nombre completo','warning');
      }
      else if(nombreUsuario.trim()==''){
        show_Alerta('Escribe un nombre de usuario','warning');
      }
      else if(numeroDocumento==''){
        show_Alerta('Escribe el numero de documento','warning');
      }
      else if(email.trim()==''){
        show_Alerta('Escribe un correo','warning');
      }
      else if(password.trim()==''){
        show_Alerta('Escribe una contraseña','warning');
      }
      else{
        if(operation==1){
          parametros={nombre:nombre.trim(),nombreUsuario:nombreUsuario.trim(),numeroDocumento:numeroDocumento,email:email.trim(),password:password.trim()};
          metodo='POST';
        }
        else{
          parametros={id:id,nombre:nombre.trim(),nombreUsuario:nombreUsuario.trim(),numeroDocumento:numeroDocumento,email:email.trim(),password:password.trim()}
          metodo='PUT';
        }
        enviarSolicitud(metodo,parametros);
      }
    }

    const enviarSolicitud=async(metodo,parametros)=>{
      await axios({method:metodo,url:url,data:parametros}).then(function(respuesta){
        let tipo=respuesta.data[0];
        let msj=respuesta.data[1];
        show_Alerta(msj,tipo);
        if(tipo=='success'){
          document.getElementById('btnCerrar').click();
          getUsers();
        }
      }).catch(function(error){
        show_Alerta('Error en la solicitud','error');
        console.log(error);
      });
    }
    
    return (
      <div className='App'>
        <div className='container-fluid'>
          <div className='row mt-3'> 
            <div className='col-md-4 offset-md-4'>
              <div className='d-grid mx-auto'>
                <button onClick={()=>openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                  <i className='fa-solid fa-circle-plus'></i> Añadir
                </button>
              </div>

            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
              <div className='table-responsive'>
                <table className='table table-bordered'>
                  <thead>
                    <tr><th>#</th><th>NOMBRE DE USUARIO</th><th>NUMERO DE DOCUMENTO</th><th>EMAIL</th><th>NOMBRE</th><th>PASSWORD</th></tr>

                  </thead>
                  <tbody className='table-group-divider'>
                    {usuarios.map((usuario,i)=>(
                      <tr key={usuario.id}>
                        <td>{(i+1)}</td>
                        <td>{usuario.nombreUsuario}</td>
                        <td>{usuario.numeroDocumento}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.password}</td>
                        <td>
                          <button onClick={()=>openModal(2,usuario.id,usuario.nombre,usuario.nombreUsuario,usuario.numeroDocumento,usuario.email,usuario.password)} 
                          className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                            <i className='fa-solid fa-edit'></i>
                          </button>
                          &nbsp;
                          <button className='btn btn-danger'>
                            <i className='fa-solid fa-trash'></i>

                          </button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>

            </div>

          </div>
        </div>
        <div id='modalUsuarios' className='modal fade' aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <label className='h5'>{title}</label>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
              <input type='hidden' id='id'></input>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                  <input type='text' id='nombre' className='form-control' placeholder='Nombre completo' value={nombre}
                  onChange={(e)=>setNombre(e.target.value)}></input>
                </div>
                <input type='hidden' id='id'></input>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-user-circle'></i></span>
                  <input type='text' id='nombreUsuario' className='form-control' placeholder='Nombre de usuario' value={nombreUsuario}
                  onChange={(e)=>setNombreusuario(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                  <input type='text' id='numeroDocumento' className='form-control' placeholder='Numero de documento' value={numeroDocumento}
                  onChange={(e)=>setNumerodocumento(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                  <input type='text' id='email' className='form-control' placeholder='Correo' value={email}
                  onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
                  <input type='text' id='password' className='form-control' placeholder='Contraseña' value={password}
                  onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className='d-grid col-6 mx-auto'>
                  <button onClick={()=>validar()} className='btn btn-success'>
                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                  </button>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
  )
}

export default ShowUsers