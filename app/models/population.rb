class Population
  attr_reader :connection, :cache

  def initialize
    @connection = Faraday.new(url: 'http://api.census.gov/data/2010')
    @cache = ActiveSupport::Cache::MemoryStore.new
    @@data = File.read("public/county_polygons_500k.json")
  end

  def shapes
    @@data
  end

  def counties
    raw = Rails.cache.fetch('county_call', :expires => 24.hour) do
      parse(connection.get('sf1?key=297776c8f16b33f03bbeeea854e3583cfcb55c69&get=P0010001&for=county:*'))
    end
    raw.shift
    raw.inject({}) do |collection, stuff|
      collection[stuff[2]] = stuff[0].to_i
      collection
    end
  end

  def parse(response)
    JSON.parse(response.body)
  end
end
