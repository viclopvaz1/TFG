<template>
  <div id="chart">
    <b-card v-if="tarjetaProfesor.horas.length > 0" style="border-color: #17a2b8">
      <apexchart type="bar" height="350" :options="chartOptionsBar" :series="seriesBar"></apexchart>
    </b-card>
    <b-card class="mt-3" style="max-width: fit-content; border-color: #17a2b8" v-if="tarjetaProfesor.publicacionesDocentes.length > 0 || tarjetaProfesor.publicaciones.length > 0">
      <apexchart type="pie" width="380" :options="pie.chartOptions" :series="seriesPie"></apexchart>
    </b-card>
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
    seriesBar: function () {
      var horas = this.getHoras();
      return [
        {
          name: "Numero de Horas",
          data: horas,
        },
      ];
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
                return ((100 * val)/horasTotal).toFixed(2) + "%";
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
    for (let i = 0; i < this.tarjetaProfesor.horas.length; i++) {
        horas.push(this.tarjetaProfesor.horas[i].horas);
    }
      return horas;
    },
    getAsignaturas() {
      var asignaturas = [];
      for (let i = 0; i < this.tarjetaProfesor.horas.length; i++) {
        asignaturas.push(this.tarjetaProfesor.horas[i].asignatura);
    }
      return asignaturas;
    },
    getHorasTotal() {
      var horas = 0;
    for (let i = 0; i < this.tarjetaProfesor.horas.length; i++) {
        horas = this.tarjetaProfesor.horas[i].horas + horas;
    }
      return horas;
    }
  },
};
</script>
