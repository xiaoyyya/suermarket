<template>
  <div>
    <h2>BScroll滚动</h2>

  <div class="wrapper" ref="wrapper">
  <ul class="content">
    <li>分科列表1</li>
    <li>分科列表2</li>
    <li>分科列表3</li>
    <li>分科列表4</li>
    <li>分科列表5</li>
    <li>分科列表6</li>
    <li>分科列表7</li>
    <li>分科列表8</li>
    <li>分科列表9</li>
    <li>分科列表10</li>
    <li>分科列表11</li>
    <li>分科列表12</li>
    <li>分科列表13</li>
    <li>分科列表14</li>
    <li>分科列表15</li>
    <li>分科列表16</li>
    <li>分科列表17</li>
    <li>分科列表18</li>
    <li>分科列表19</li>
    <li>分科列表20</li>
    <li>分科列表21</li>
    <li>分科列表22</li>
    <li>分科列表23</li>
    <li>分科列表24</li>
    <li>分科列表25</li>
    <li>分科列表26</li>
    <li>分科列表27</li>
    <li>分科列表28</li>
    <li>分科列表29</li>
    <li>分科列表30</li>
    <li>分科列表31</li>
    <li>分科列表32</li>
    <li>分科列表33</li>
    <li>分科列表34</li>
    <li>分科列表35</li>
    <li>分科列表36</li>
    <li>分科列表37</li>
    <li>分科列表38</li>
    <li>分科列表39</li>
    <li>分科列表40</li>
    <li>分科列表41</li>
    <li>分科列表42</li>
    <li>分科列表43</li>
    <li>分科列表44</li>
    <li>分科列表45</li>
    <li>分科列表46</li>
    <li>分科列表47</li>
    <li>分科列表48</li>
    <li>分科列表49</li>
    <li>分科列表50</li>
    <li>分科列表51</li>
    <li>分科列表52</li>
    <li>分科列表53</li>
    <li>分科列表54</li>
    <li>分科列表55</li>
    <li>分科列表56</li>
    <li>分科列表57</li>
    <li>分科列表58</li>
    <li>分科列表59</li>
    <li>分科列表60</li>
    <li>分科列表61</li>
    <li>分科列表62</li>
    <li>分科列表63</li>
    <li>分科列表64</li>
    <li>分科列表65</li>
    <li>分科列表66</li>
    <li>分科列表67</li>
    <li>分科列表68</li>
    <li>分科列表69</li>
    <li>分科列表70</li>
    <li>分科列表71</li>
    <li>分科列表72</li>
    <li>分科列表73</li>
    <li>分科列表74</li>
    <li>分科列表75</li>
    <li>分科列表76</li>
    <li>分科列表77</li>
    <li>分科列表78</li>
    <li>分科列表79</li>
    <li>分科列表80</li>
    <li>分科列表81</li>
    <li>分科列表82</li>
    <li>分科列表83</li>
    <li>分科列表84</li>
    <li>分科列表85</li>
    <li>分科列表86</li>
    <li>分科列表87</li>
    <li>分科列表88</li>
    <li>分科列表89</li>
    <li>分科列表90</li>
    <li>分科列表91</li>
    <li>分科列表92</li>
    <li>分科列表93</li>
    <li>分科列表94</li>
    <li>分科列表95</li>
    <li>分科列表96</li>
    <li>分科列表97</li>
    <li>分科列表98</li>
    <li>分科列表99</li>
    <li>分科列表100</li>
  </ul>
  </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Category",
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{

    })
  }
}
</script>

<style scoped>
.wrapper{
  height:calc(100%- 93px);
  background: #f00;
  color:#fff;
  overflow: hidden;
}
</style>
