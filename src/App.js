import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";



const data = [
  {id: 1 , nombre: "Pablo", edad: " 15 " },
];


class App extends React.Component{
 state={
   data:data,
   modalActualizar : false,
   modalInsertar: false,
   form:{
     id: "",
     nombre: "",
     edad: ""

   },
 };

 mostrarModalActualizar = (dato) => {
  this.setState({
    form: dato,
    modalActualizar: true,
  });
}

cerrarModalActualizar = () => {
  this.setState({ modalActualizar: false });
};

mostrarModalInsertar = () => {
  this.setState({
    modalInsertar: true,
  });
};

cerrarModalInsertar = () => {
  this.setState({ modalInsertar: false });
};


 editar = (dato) => {
  var contador = 0;
  var arreglo = this.state.data;
  arreglo.map((registro) => {
    if (dato.id == registro.id) {
      arreglo[contador].nombre = dato.nombre;
      arreglo[contador].edad = dato.edad;
    }
    contador++;
  });
  this.setState({ data: arreglo, modalActualizar: false });
};


eliminar = (dato) => {
  var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
  if (opcion == true) {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo.splice(contador, 1);
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  }
};

insertar= ()=>{
  var valorNuevo= {...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista= this.state.data;
  lista.push(valorNuevo);
  this.setState({ modalInsertar: false, data: lista });
}

 handleChange = (e) => {
   this.setState({
     form:{
       ...this.state.form,
       [e.target.name]: e.target.value,
     },
   });
 };

 

  render(){
    return(
      <>
      <Container>
       <br /> 
        <Button color="success" outline onClick={()=>this.mostrarModalInsertar()}>Insertar Persona</Button>
        <br /><br />

        <Table>
          <thead><tr><th>Id</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Acciones</th></tr></thead>
          <tbody>
            {this.state.data.map((dato)=>(
              <tr>
                <td>{dato.id}</td>
                <td>{dato.nombre}</td>
                <td>{dato.edad}</td>
                <td><Button color='secondary' onClick={() => this.mostrarModalActualizar(dato)} outline>Editar</Button>{" "}
                <Button color='danger' onClick={()=> this.eliminar(dato)} outline>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      
      <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
            

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name="nombre" type="text" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <label>Edad:</label>
            <input className='form-control' name="edad"  type="number" onChange={this.handleChange}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => this.insertar()} outline>Insertar</Button>
          <Button color='danger' onClick={() => this.cerrarModalInsertar()} outline>Cancelar</Button>
        </ModalFooter>
      </Modal>

      </>
    )
  }

}

export default App;