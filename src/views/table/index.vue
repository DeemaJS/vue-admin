<template>
  <div class="app-container">
      <div >
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer :url="url"/>
      <!-- <l-control class="example-custom-control">
        <p @click="showAlert">
          Click me
        </p>
      </l-control>
      <l-control
        :position="'bottomleft'"
        class="custom-control-watermark"
      >
        Vue2Leaflet Watermark Control
      </l-control> -->
      <l-marker :lat-lng="marker">
        <l-popup content="TEST"></l-popup>
      </l-marker>  
    </l-map>
  </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="ID"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        label="Name"
        width="180"
        align="center"
        >
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Addres"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.Addres }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Number"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.Number }}
        </template>
      </el-table-column>
      <el-table-column
        label="Longitude"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.Long }}
        </template>
      </el-table-column>
      <el-table-column
        label="Latitude"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.Lat }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getDevices } from '@/api/devices'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { IDeviceData } from '@/api/types'

// L.Icon.Default.imagePath = '.'
type D = L.Icon.Default & {
  _getIconUrl?: string;
};

delete (L.Icon.Default.prototype as D)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

@Component({
  name: 'Table',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime: (timestamp: string) => {
      return new Date(timestamp).toISOString()
    }
  }
})

export default class extends Vue {
  private list: any = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }
 
  data() {
    return ({
       zoom: 13,
       center: L.latLng(47.41322,36),
       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       marker: L.latLng(47.41322, 36)
    }
)

  }  

  created() {
    this.getList()
  }

  async getList() {
    this.listLoading = true
    const data = await getDevices(this.listQuery)
    console.log('>>>>>>>',data)
    this.list = data
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>
