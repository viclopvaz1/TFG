<template>
  <div id="chart">

      <b-card v-if="tarjetaProfesor.horas.length > 0" style="border-color: #17a2b8">
        <apexchart type="bar" height="350" :options="chartOptionsBar" :series="seriesBar"></apexchart>
      </b-card>

    <b-row style="
    place-content: center;">
      <b-card class="mt-3" style="margin-right: 30px; border-color: #17a2b8" v-if="tarjetaProfesor.publicacionesDocentes.length > 0 || tarjetaProfesor.publicaciones.length > 0">
        <apexchart type="pie" width="380" :options="pie.chartOptions" :series="seriesPie"></apexchart>
      </b-card>
      <b-card class="mt-3" style="border-color: #17a2b8" v-if="tarjetaProfesor.estancias.length > 0">
        <apexchart type="pie" width="380" :options="pieEstancias.chartOptions" :series="seriesPieEstancias"></apexchart>
      </b-card>
    </b-row>
    <b-row
    style="
    place-content: center;">
      <b-card class="mt-3" style="margin-right: 30px; border-color: #17a2b8" v-if="tarjetaProfesor.cursosDocentes.length > 0">
        <apexchart type="pie" width="380" :options="pieCursos.chartOptions" :series="seriesPieCursos"></apexchart>
      </b-card>
      <b-card class="mt-3" style="border-color: #17a2b8" v-if="tarjetaProfesor.seguidos.length > 0 || tarjetaProfesor.seguidores.length > 0">
        <apexchart type="pie" width="380" :options="pieSeguidosSeguidores.chartOptions" :series="seriesPieSeguidosSeguidores"></apexchart>
      </b-card>
    </b-row>
    <b-row
    style="
    place-content: center;">
      <b-card class="mt-3" style="max-width: fit-content; border-color: #17a2b8" v-if="tarjetaProfesor.comentarios.length > 0">
        <apexchart type="radar" height="350" width="480" :options="chartOptionsRadarComentarios" :series="seriesRadarComentarios"></apexchart>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Resumenes",
  data() {
    return {
      pie: {
        chartOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Publicaciones Docentes", "Publicaciones"],
          legend: {
                  position: "bottom",
                },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      pieEstancias: {
        chartOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Estancias Erasmus", "Estancias Docentes"],
          legend: {
                  position: "bottom",
                },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      pieCursos: {
        chartOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Cursos Recibidos", "Cursos Dados"],
          legend: {
                  position: "bottom",
                },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      pieSeguidosSeguidores: {
        chartOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Seguidos", "Seguidores"],
          legend: {
                  position: "bottom",
                },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
      this.tarjetaProfesor = this.profesor;
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    seriesPie: function () {
      return [
        this.tarjetaProfesor.publicacionesDocentes.length,
        this.tarjetaProfesor.publicaciones.length,
      ];
    },
    seriesPieEstancias: function () {
      return [
        this.getEstanciasErasmus(),
        this.getEstanciasDocentes(),
      ];
    },
    seriesPieCursos: function () {
      return [
        this.getCursosRecibidos(),
        this.getCursosDados(),
      ];
    },
    seriesPieSeguidosSeguidores: function () {
      return [
        this.tarjetaProfesor.seguidos.length,
        this.tarjetaProfesor.seguidores.length,
      ];
    },
    seriesBar: function () {
      var horas = this.getHoras();
      return [
        {
          name: "Numero de Horas",
          data: horas,
        },
      ];
    },
    seriesRadarComentarios: function() {
      return [
        {
          // name: "Numero de ",
          data: this.getComentariosPorPuntuacion(),
        },
      ];
    },
    chartOptionsRadarComentarios: function(){
      return {
        chart: {
              height: 350,
              type: 'radar',
            },
            dataLabels: {
              enabled: true
            },
            plotOptions: {
              radar: {
                size: 140,
                polygons: {
                  strokeColors: '#e9e9e9',
                  fill: {
                    colors: ['#f8f8f8', '#fff']
                  }
                }
              }
            },
            title: {
              text: 'Cantidad de Comentarios por valoración'
            },
            colors: ['#FF4560'],
            markers: {
              size: 4,
              colors: ['#fff'],
              strokeColor: '#FF4560',
              strokeWidth: 2,
            },
            tooltip: {
              y: {
                formatter: function(val) {
                  return val
                }
              },
              enabled: false
            },
            xaxis: {
              categories: ['1 Estrella', '2 Estrellas', '3 Estrellas', '4 Estrellas', '5 Estrellas']
            },
            // yaxis: {
            //   tickAmount: 5,
            //   labels: {
            //     formatter: function(val, i) {
            //       if (i % 2 === 0) {
            //         return val
            //       } else {
            //         return ''
            //       }
            //     }
            //   }
            // }
      }
            
          },
    chartOptionsBar: function() {
        var asignaturas = this.getAsignaturas();
        var horasTotal = this.getHorasTotal();
        return {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return (100 * val/horasTotal).toFixed(2) + "%";
              },    
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: asignaturas,
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
            },
            title: {
              text: 'Horas por Asignaturas',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
        }          
    },
  },
  methods: {
    getHoras() {
      var horas = [];
    for (let hora in this.tarjetaProfesor.horas) {
      if (this.tarjetaProfesor.horas[hora].validada == "1") {
        horas.push(this.tarjetaProfesor.horas[hora].horas);
      } 
    }
      return horas;
    },
    getAsignaturas() {
      var asignaturas = [];
      for (let hora in this.tarjetaProfesor.horas) {
        if (this.tarjetaProfesor.horas[hora].validada == "1") {
          asignaturas.push(this.tarjetaProfesor.horas[hora].asignatura);
        }
    }
      return asignaturas;
    },
    getHorasTotal() {
      var horas = 0;
      for (let hora in this.tarjetaProfesor.horas) {
        if (this.tarjetaProfesor.horas[hora].validada == "1") {
          horas = this.tarjetaProfesor.horas[hora].horas + horas;
        }
      }
      return horas;
    },
    getEstanciasErasmus() {
      var estanciasErasmus = [];
      for (let estanciaErasmu in this.tarjetaProfesor.estancias) {
        if (this.tarjetaProfesor.estancias[estanciaErasmu].tipo == "Erasmus"){
          estanciasErasmus.push(this.tarjetaProfesor.estancias[estanciaErasmu]);
        }  
    }
      return estanciasErasmus.length;
    },
    getEstanciasDocentes() {
      var estanciasDocentes = [];
      for (let estanciaDocente in this.tarjetaProfesor.estancias) {
        if (this.tarjetaProfesor.estancias[estanciaDocente].tipo == "Docente"){
          estanciasDocentes.push(this.tarjetaProfesor.estancias[estanciaDocente]);
        }  
    }
      return estanciasDocentes.length;
    },
    getCursosRecibidos() {
      var cursosRecibidos = [];
      for (let cursoRecibido in this.tarjetaProfesor.cursosDocentes) {
        if (this.tarjetaProfesor.cursosDocentes[cursoRecibido].tipo == "Recibido"){
          cursosRecibidos.push(this.tarjetaProfesor.cursosDocentes[cursoRecibido]);
        }  
    }
      return cursosRecibidos.length;
    },
    getCursosDados() {
      var cursosDados = [];
      for (let cursoDado in this.tarjetaProfesor.cursosDocentes) {
        if (this.tarjetaProfesor.cursosDocentes[cursoDado].tipo == "Dado"){
          cursosDados.push(this.tarjetaProfesor.cursosDocentes[cursoDado]);
        }  
    }
      return cursosDados.length;
    },
    getComentariosPorPuntuacion() {
      var comentarios1 = 0;
      var comentarios2 = 0;
      var comentarios3 = 0;
      var comentarios4 = 0;
      var comentarios5 = 0;
      for (let comentario in this.tarjetaProfesor.comentarios) {
        switch (this.tarjetaProfesor.comentarios[comentario].valoracion) {
          case 1:
            comentarios1++;
            break;
          case 2:
            comentarios2++;
            break;
          case 3:
            comentarios3++;
            break;
          case 4:
            comentarios4++;
            break;
          case 5:
            comentarios5++;
            break;
          }
      }
      var lista = [];
      lista.push(comentarios1);
      lista.push(comentarios2);
      lista.push(comentarios3);
      lista.push(comentarios4);
      lista.push(comentarios5);
      return lista;
    },
  },
};
</script>
