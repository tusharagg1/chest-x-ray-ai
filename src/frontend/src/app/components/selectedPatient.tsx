import { Component } from "react";

class Toggle extends Component {
    componentDidMount() {
      const storedValue = localStorage.getItem("selectedPatient");
      if (storedValue) {
        this.setState({ value: storedValue });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange = (e: { target: { value: any; }; }) => {
      const value = e.target.value;
      this.setState({ value });
      localStorage.setItem("selectedPatient", value);
    }
    // render() {
    //   return ...
    // }
  }