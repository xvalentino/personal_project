require 'rails_helper'

RSpec.describe PopulationsHelper, type: :helper do
  VCR.use_cassette('population_shapes') do
    shapes = Population.shapes
    assert_equal "whatever", shapes
  end
end
