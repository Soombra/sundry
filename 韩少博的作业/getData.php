<?php
//$url = "https://graph.facebook.com/v2.8/search?type=user&fields=id,name,picture.width(50).height(50)&q=USC&access_token=EAABc73XSakgBAHHxLRRyAPgRnrO8elMxU0bVWT5yZBGRNB2o5VjsjBHrYrHIWdoi7ZCKkuoIXmmfiYIG9ybenvorOFdypPE8CWMRVZBowg3b3yJJVtNfVKuZCyKfZCGNBfUnAcyBNIgm5zQ0YNI1ETvhKc8C4GdcIngZCLjVi1fKd2gZBLhZAPMO6gQa4kDEnXQZD";
$url = $_POST['url'];
die(file_get_contents($url));