class Population
  attr_reader :connection

  def initialize
    @connection = Faraday.new(url: 'http://api.census.gov/data/2010')
  end

  def counties
    raw = parse(connection.get('sf1?key=297776c8f16b33f03bbeeea854e3583cfcb55c69&get=PCT0120001&for=county:*'))
    raw.shift
    raw.inject({}) do |collection, stuff|
      collection[stuff[2]] = stuff[0] 
      collection
    end
  end

  def parse(response)
    JSON.parse(response.body)
  end
end
