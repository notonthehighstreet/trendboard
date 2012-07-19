require 'rubygems'
require 'sinatra'
require 'httparty'
require "json"

get '/' do
  erb :index
end

get '/products' do
  content_type :json
  response = HTTParty.get("http://www.dev.notonthehighstreet.com/product_trends.json")
  response.body.to_json
end
