<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-link to="/home">Logo</b-link>

      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <b-collapse is-nav style="max-width: fit-content">
        <b-navbar-nav>
          <div style="width: 105px">
            <b-link to="/login">Iniciar Sesion</b-link>
          </div>
          <div>
            <b-link to="/registro">Regístrate</b-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "BarraSinRegistrar",
};
</script>

<style></style>
