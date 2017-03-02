require 'sinatra'
WEB_URL = 'http://localhost:3000'

get '/index.json' do
  content_type :json
  headers 'Access-Control-Allow-Origin' => WEB_URL
  sleep 1
  File.read("index.json")
end

get '/survey_results/:id.json' do
  content_type :json
  sleep 1
  headers 'Access-Control-Allow-Origin' => WEB_URL
  File.read("survey_results/#{params['id']}.json")
end
