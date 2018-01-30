<template>
  <section class="filters">
    <!--<el-input 
      class="query" 
      placeholder="Search for an event..." 
      v-model="filter.query"
      prefix-icon="el-icon-search">
    </el-input>

    <el-date-picker
      class="date"
      v-model="filter.date"
      type="date"
      placeholder="Filter by start date">
    </el-date-picker>
    
    <el-select
      class="genres"
      v-model="filter.genres"
      multiple
      placeholder="Filter by genre">
      <el-option
        v-for="item in genres"
        :key="item.label"
        :label="item.label"
        :value="item.label"
        prefix-icon="el-icon-search ">
      </el-option>
    </el-select>
    
    <el-select
      class="flags"
      v-model="filter.flags"
      multiple
      placeholder="Filter by event type"
      prefix-icon="el-icon-tickets">
      <el-option
        v-for="item in flags"
        :key="item.label"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        query: '',
        date: '',
        genres: [],
        flags: [],
      },
      genres: [
        { label: 'HOUSE', key: 'HOUSE' },
        { label: 'PROG HOUSE', key: 'PROG_HOUSE' },
        { label: 'DEEP HOUSE', key: 'DEEP_HOUSE' },
        { label: 'TECH HOUSE', key: 'TECH_HOUSE' },
        { label: 'ACID HOUSE', key: 'ACID_HOUSE' },
        { label: 'TECHNO', key: 'TECHNO' },
        { label: 'DISCO', key: 'DISCO' },
        { label: 'COMMERCIAL HOUSE', key: 'COMMERCIAL_HOUSE' },
        { label: 'DNB/BREAKS', key: 'DNB_BREAKS' },
        { label: 'MISC', key: 'MISC' },
      ],
      flags: [
        { label: 'INTERNATIONAL ARTIST', key: 'INTERNATIONAL_ARTIST' },
        { label: 'BYO ALCOHOL', key: 'BYO_ALCOHOL' },
        { label: 'FREE ENTRY', key: 'FREE_ENTRY' },
        { label: 'CASH ONLY', key: 'CASH_ONLY' },
        { label: 'CRUISE', key: 'CRUISE' },
        { label: 'DAY', key: 'DAY' },
        { label: 'FESTIVAL', key: 'FESTIVAL' },
        { label: 'BUSH DOOF', key: 'BUSH_DOOF' },
        { label: 'WAREHOUSE', key: 'WAREHOUSE' },
      ],
    };
  },
};
</script>

<style lang="scss">
.filters {
  margin-top: 35px;
  padding-right: 25px;

  .el-date-editor {
    width: 100%;
    margin: 5px 0;
  }

  .el-input {
    width: 100%;
  }

  .el-select {
    width: 100%;
    margin-bottom: 5px;
  }
}

@media (max-height: 480px) {
  .filters {
    padding-right: 0;
  }
}
</style>
