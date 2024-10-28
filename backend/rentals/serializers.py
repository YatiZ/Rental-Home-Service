from rest_framework import serializers

from . models import CarGallery, Car, Contact



class ImageCarGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarGallery
        fields =['image']

class CarListSerializer(serializers.ModelSerializer):
    image = ImageCarGallerySerializer(many=True)
    class Meta:
        model = Car
        fields = ['id','brand','main_img','brand_logo','description','model','year','transmission',
                  'color','passengers','suitcases','gas_type','price_per_day','status', 'image'
                  ]
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'