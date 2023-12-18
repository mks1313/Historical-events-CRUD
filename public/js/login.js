document.addEventListener("DOMContentLoaded", () => {
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const fistForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");
  
    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  
    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
  
    fistForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí deberías enviar el formulario a tu servidor para el registro
  
      // Simulamos una llamada asíncrona al servidor usando una promesa
      simulateServerRequest()
        .then(() => {
          // Después de que la promesa sea resuelta (simulando un registro exitoso),
          // realiza la redirección
          window.location.href = "/user-profile";
        })
        .catch((error) => {
          // Manejar errores si es necesario
          console.error("Error durante el registro:", error);
        });
    });
  
    secondForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí deberías enviar el formulario a tu servidor para el inicio de sesión
  
      // Simulamos una llamada asíncrona al servidor usando una promesa
      simulateServerRequest()
        .then(() => {
          // Después de que la promesa sea resuelta (simulando un inicio de sesión exitoso),
          // realiza la redirección
          window.location.href = "/user-profile";
        })
        .catch((error) => {
          // Manejar errores si es necesario
          console.error("Error durante el inicio de sesión:", error);
        });
    });
  
    // Función para simular una llamada asíncrona al servidor (puedes eliminar esto en tu código real)
    function simulateServerRequest() {
      return new Promise((resolve, reject) => {
        // Simulamos un tiempo de espera de 1 segundo antes de resolver la promesa
        setTimeout(() => {
          // Resolvemos la promesa
          resolve();
          // En un escenario real, aquí deberías realizar la lógica del servidor
        }, 1000);
      });
    }
  });
  