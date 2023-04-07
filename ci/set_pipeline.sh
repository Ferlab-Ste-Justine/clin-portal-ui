#!/usr/bin/env bash

set -e

target=main
# Have to create current_dir to get absolute path of the git repository, $(dirname pwd) returns .
current_dir=$(pwd)
repo_dir=$(dirname $current_dir)
pipeline=$(basename $repo_dir)
branch=main
initial_version=1.0.0
tag_as_latest=true

usage() {
  echo "Usage: $0 [-t <target>] [-p <pipeline>] [-b <branch>] [-l <true/false>] [-v <initial_version>] " 1>&2
  exit 1
}

while getopts ":t:p:b:l:v:s:" o; do
  case "${o}" in
  t)
    target=${OPTARG}
    ;;
  p)
    pipeline=${OPTARG}
    ;;
  b)
    branch=${OPTARG}
    ;;
  l)
    tag_as_latest=${OPTARG}
    ;;
  v)
    initial_version=${OPTARG}
    ;;
  *)
    usage
    ;;
  esac
done
shift $((OPTIND - 1))

# Validate mandatory fields
if [ -z "${target}" ] || [ -z "${pipeline}" ] || [ -z "${branch}" ] || [ -z "${tag_as_latest}" ] || [ -z "${initial_version}" ]; then
  usage
fi
fly -t $target sp -n -p $pipeline -c ./pipeline.yml  \
    -v branch=$branch \
    -v initial_version=$initial_version \
    -v tag_as_latest=$tag_as_latest \
    -v s3_bucket=$s3_bucket \
    -v s3_region=$s3_region \
    -l ./params.yml
